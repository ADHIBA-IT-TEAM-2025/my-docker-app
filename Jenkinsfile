pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YourUsername/my-docker-app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                // stop old containers if running
                sh 'docker-compose down || true'
                // run new containers
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker ps -a'
        }
    }
}
