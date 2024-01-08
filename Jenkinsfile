pipeline {
     agent {
         label 'int-node-stg-3'
     }
     stages {
        stage("Build") {
            steps {
                sh "sudo npm i"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo pm2 restart qienhancement-2058"
                sh "echo node-qienhancement.mobiloitte.io"

            }
        }
    }
}
