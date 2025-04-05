pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('azure-service-principal')
        GITHUB_CREDENTIALS = credentials('github-pat')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: "${GITHUB_CREDENTIALS}", url: 'https://github.com/Vamaa-shah/azure-function-jenkins-8953026.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'No tests defined yet'
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal('azure-service-principal')]) {
                    bat '''
                        az login --service-principal -u %AZURE_CREDENTIALS_USR% -p %AZURE_CREDENTIALS_PSW% --tenant 97351641-0732-493e-9b3f-25564a91ca6a
                        az functionapp deployment source config-zip -g rg-vamaa -n hello-func-vamaa01 --src function.zip
                    '''
                }
            }
        }
    }
}
