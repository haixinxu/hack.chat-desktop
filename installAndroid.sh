#!/usr/bin/env bash
#sudo add-apt-repository ppa:openjdk-r/ppa
#sudo apt-get update
#sudo apt-get install openjdk-8-jre
#sudo apt-get install openjdk-8-jdk
wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip
mkdir /android_sdk && unzip tools_r25.2.3-linux.zip -d /android_sdk
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t platform-tools
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t tools
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t build-tools-25.0.0
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t android-23
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t extra-google-m2repository
echo y | "$ANDROID_HOME/tools/android" update sdk -u -a -t extra-android-m2repository