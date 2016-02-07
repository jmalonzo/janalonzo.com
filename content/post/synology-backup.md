+++
categories = ["Tech"]
date = "2015-04-26T18:25:55+10:00"
description = "Using GPG's symmetric encryption to encrypt backups to Amazon S3"
draft = true
title = "Synology Encrypted Backups"

+++

* Install PYthon Modules package from the UI. This will install
easy_install

* easy_install pip
* ~/.local/bin/pip install s3cmd
* s3cmd --configure
* Add your access/secret keys, GPG passphrase, etc..
* test backup command line - /usr/bin/s3cmd --encrypt --ssl --server-side-encryption --recursive put /volume1/Docs/ s3://document.backup/
* Add to crontab - nano /etc/crontab
* restart crond - synoservicectl -restart crond

