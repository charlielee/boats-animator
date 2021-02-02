# NSIS Installer Macros
# See https://www.electron.build/configuration/nsis#custom-nsis-script
!include LogicLib.nsh

!macro preInit
  # This macro is inserted at the beginning of the NSIS .OnInit callback
  Call UninstallInnoVersion
!macroend

# Remove any Inno Setup installed versions of the app
Function UninstallInnoVersion
  # Check for uninstaller
  ReadRegStr $R0 HKLM "SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\{1FC75801-F556-47E9-B782-C48EFA74F285}_is1" "UninstallString"

  ${If} $R0 == ""
    DetailPrint "No previous Inno Setup installation found"
    Goto Done
  ${EndIf}

  # Run the uninstaller silently
  DetailPrint "Removing previous Inno Setup installation"

  ExecWait '"$R0" /SILENT'

  Done:
FunctionEnd
