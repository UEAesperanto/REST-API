#!/bin/bash
which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval "$(ssh-agent -s)"
ssh-add <(echo "$SSH_PRIVATE_KEY")
ssh -oStrictHostKeyChecking=no splab@ocarina.splab.ufcg.edu.br /home/splab/deploy/uea.sh
