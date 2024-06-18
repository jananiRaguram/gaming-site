# GitLab CI/CD Pipeline - using a VM

This information is from:
https://karol-filipczuk.medium.com/gitlab-ci-cd-pipeline-run-script-via-ssh-to-remote-server-9594f326bc2f

## 1. create SSH key using the VM

- When creating an SSH key, will get 2 keys (private and public) using the VM.
- the created key will be stored in the `/home/<user>/.ssh` directory
- no need to create a passphrase
- the public key will end with .pub

create a new key with:
```
ssh-keygen -t ed25519 -C "GitLab SSH key"
```

## 2. add private key to Gitlab

Go to `Settings -> CI/CD -> Variables -> Expand -> Add Variable` and add the private key as the value where the name is `SSH_PRIVATE_KEY`

Also add the `SSH_USER` (name of the user on the remote server) and the `VM_IPADDRESS` (IP address of the remote server)

## 3. add public key to VM 
Login as the same user as the `SSH_USER` and go to `/home/<username>/.ssh` paste the public key you got before into `authorized_keys` file. Create either file if they don't exist

## 4. create and run the pipeline

Clone the repo and edit the .yml file.

Add the following to run as a list of checks and setup (this is for the deployment stage but there are other stages you can change it to such as test and build) 
```
image: alpine:latest

pages:
  stage: deploy
  before_script:
  - 'command -v ssh-agent >/dev/null || ( apk add --update openssh )' 
  - eval $(ssh-agent -s)
  - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  - mkdir -p ~/.ssh
  - chmod 700 ~/.ssh
  - ssh-keyscan $VM_IPADDRESS >> ~/.ssh/known_hosts
  - chmod 644 ~/.ssh/known_hosts
  script:
  - ssh $SSH_USER@$VM_IPADDRESS "hostname && echo 'Welcome!!!' > welcome.txt"
  artifacts:
    paths:
    - public
  only:
  - master
```

#### definitions of commands
- `artifacts`: artifacts to use in deployment (not used in the example)

- `only`: indicates (in the example) that the job should be only run if any change is pushed into master branch in repository.

- more info here https://docs.gitlab.com/ee/ci/ssh_keys/

after pushing the changes to the remote repo, the pipline should run. 


### connecting through VPN

I haven't tested this but I found this thread similar to our connection issues with the VPN and CICD https://forum.gitlab.com/t/connect-vpn-during-ci-cd/7585