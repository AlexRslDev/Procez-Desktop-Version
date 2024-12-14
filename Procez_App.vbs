Set WshShell = CreateObject("WScript.Shell")
currentDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
batFile = currentDir & "\app.bat"
WshShell.Run """" & batFile & """", 0, False