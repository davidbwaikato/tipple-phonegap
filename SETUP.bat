@ECHO off

echo.
echo ******
echo * Setting up command-line environment for PhoneGap
echo ******

echo +
set ADT_SDK_HOME=C:\Apps\Android\adt\sdk
set PATH=%ADT_SDK_HOME%\tools\;%ADT_SDK_HOME%\platform-tools;%PATH%
echo + Setting ADT_SDK_HOME to
echo +  ADT_SDK_HOME
echo + And adding 'tools' and 'platform-tools' to PATH

echo +
set ANT_HOME=C:\Apps\Ant
set PATH=%ANT_HOME%\bin\;%PATH%
echo + Setting ANT_HOME to
echo +  %ANT_HOME%
echo + And adding 'bin' to PATH


echo +
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_20
set PATH=%JAVA_HOME%\bin;%PATH%
echo + Setting JAVA_HOME to
echo +  %JAVA_HOME%
echo + And adding 'bin' to PATH

: Sometimes the following is needed
: set GIT_SSL_NO_VERIFY=true
: echo ++ Set environment variable 'GIT_SSL_NO_VERIFY' to true

