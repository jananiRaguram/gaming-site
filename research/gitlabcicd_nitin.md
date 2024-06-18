## Research for CI/CD
GitLab CI/CD offers users with many tools that can be integrated into their project to automate the software development lifecycle. The main purpose of GitLab CI/CD is to streamline the testing and deploying aspect of software development, making the overall software development much more efficient.

One of the phases in GitLab CI/CD is the testing phase. In this part, developers can create a set of test cases and then run them using the CI/CD. One of the main types of tests that can be created are unit tests which can help validate the overall functionality of components. Having this integrated into the CI/CD would make it easier to find what updates broke the functionality as the tests would always run when there would be code pushed.

Another important part of the GitLab CI/CD is the deployment aspect. In this part, developers can make sure that if the tests pass then the code can be pushed to the development server. This reduces the manual process and also makes it easier to make changes.

To create CI/CD in GitLab there needs to be a file created called .gitlab-ci.yml
Generating keys to SSH in the server

Steps
ssh-keygen -t ed25519 -C "<comment>"
Take the pub key and make sure it is updated in the authorized_keys file
In GitLab socs go to settings for the project and click CI/CD
Once in CI/CD go to variables and expand
Click on Add variable and enter file for type 
Enter SSH_KEY for key
Enter the private key value from the server for Value

Now you should be able to use that SSH_KEY variable in the .gitlab-ci.yml file
