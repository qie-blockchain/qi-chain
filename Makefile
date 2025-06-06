
.PHONY: download-submodules
download-submodules:
	git submodule init
	git submodule update

.PHONY: bindata
bindata:
	go-bindata -pkg chain -o ./chain/chain_bindata.go ./chain/chains

.PHONY: protoc
protoc:
	protoc --go_out=. --go-grpc_out=. ./server/proto/*.proto
	#protoc --go_out=. --go-grpc_out=. ./protocol/proto/*.proto
	protoc --go_out=. --go-grpc_out=. ./network/proto/*.proto
	protoc --go_out=. --go-grpc_out=. ./txpool/proto/*.proto
	protoc --go_out=. --go-grpc_out=. ./consensus/ibft/**/*.proto
	protoc --go_out=. --go-grpc_out=. ./consensus/polybft/**/*.proto

.PHONY: build
build:
	$(eval LATEST_VERSION = $(shell git describe --tags --abbrev=0))
	$(eval COMMIT_HASH = $(shell git rev-parse HEAD))
	$(eval BRANCH = $(shell git rev-parse --abbrev-ref HEAD | tr -d '\040\011\012\015\n'))
	$(eval TIME = $(shell date))
	go build -o qi-chain main.go

.PHONY: lint
lint:
	golangci-lint run --config .golangci.yml

.PHONY: generate-bsd-licenses
generate-bsd-licenses:
	./generate_dependency_licenses.sh BSD-3-Clause,BSD-2-Clause > ./licenses/bsd_licenses.json

.PHONY: test
test:
	go test -coverprofile coverage.out -timeout=20m `go list ./... | grep -v e2e`

.PHONY: test-e2e
test-e2e:
    # We need to build the binary with the race flag enabled
    # because it will get picked up and run during e2e tests
    # and the e2e tests should error out if any kind of race is found
	go build -race -o artifacts/polygon-edge .
	env EDGE_BINARY=${PWD}/artifacts/polygon-edge go test -v -timeout=30m ./e2e/...

.PHONY: test-e2e-polybft
test-e2e-polybft:
    # We can not build with race because of a bug in boltdb dependency
	go build -o artifacts/polygon-edge .
	env EDGE_BINARY=${PWD}/artifacts/polygon-edge E2E_TESTS=true E2E_LOGS=true go test -v -timeout=30m ./e2e-polybft/...

.PHONY: compile-core-contracts
compile-core-contracts:
	cd core-contracts && npm install && npm run compile
	go run ./consensus/polybft/contractsapi/gen/main.go

