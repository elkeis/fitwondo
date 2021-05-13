#!/bin/bash

PLIST=platforms/ios/*/*-Info.plist

/usr/libexec/PlistBuddy -c "Add :NSMotionUsageDescription string Your steps will be counted" $PLIST

true
