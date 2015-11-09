﻿#define MyAppName "Boats Animator"
#define MyAppVersion "0.6.1"
#define MyAppPublisher "Charlie Lee"
#define MyAppURL "https://github.com/BoatsAreRockable/animator"
#define MyAppExeName "Boats Animator.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{1FC75801-F556-47E9-B782-C48EFA74F285}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
LicenseFile=userdocs:GitHub\animator\win-install\LICENSE.rtf
OutputDir=userdocs:Development\Boats Animator\RELEASES\Windows Installers
OutputBaseFilename=Boats-Animator-{#MyAppVersion}-setup
Compression=lzma2/ultra
SolidCompression=yes
WizardImageFile=userdocs:GitHub\animator\win-install\setupbanner.bmp
WizardSmallImageFile=userdocs:GitHub\animator\win-install\setuplogosmall.bmp
Uninstallable=yes
UninstallDisplayName={#MyAppName} {#MyAppVersion}
UninstallDisplayIcon={app}\{#MyAppExeName}
DisableWelcomePage=yes
DisableProgramGroupPage=auto

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "userdocs:Development\Boats Animator\RELEASES\Boats Animator {#MyAppVersion}\boats-animator-v{#MyAppVersion}-windows-x32\Boats Animator.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "userdocs:Development\Boats Animator\RELEASES\Boats Animator {#MyAppVersion}\boats-animator-v{#MyAppVersion}-windows-x32\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{group}\{cm:UninstallProgram, {#MyAppName}}"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
