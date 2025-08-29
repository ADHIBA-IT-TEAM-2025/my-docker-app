pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                sh '''
                  if [ -d ".git" ]; then
                    git pull origin main
                  else
                    git clone https://github.com/ADHIBA-IT-TEAM-2025/my-docker-app.git .
                  fi
                '''
            }
        }
        stage('Build and Run with Docker Compose') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
    }
}
