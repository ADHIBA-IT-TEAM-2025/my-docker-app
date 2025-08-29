pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'sanjeev26082002'
        DOCKER_HUB_PASS = 'Sanju@02/'
    }

    stages {

        stage('Build Backend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build || echo "No build script for backend"'
                }
            }
        }

        stage('Build Frontend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

       stage('Build Docker Images') {
    steps {
        sh 'docker build -t sanjeev26082002/backend -f ./backend/Dockerfile.backend ./backend'
        sh 'docker build -t sanjeev26082002/frontend -f ./frontend/Dockerfile.frontend ./frontend'
    }
}


        stage('Push to Docker Hub') {
            steps {
                sh '''
                    echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                    docker push sanjeev26082002/backend
                    docker push sanjeev26082002/frontend
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Build failed!"
        }
        success {
            echo "✅ Build succeeded!"
        }
    }
}
