Start-Process powershell {
    python -m venv env
    env\Scripts\activate.bat
    python -m pip install -r requirements.txt
    python .\fishingstore\manage.py migrate
    Write-Host -NoNewLine 'Press any key to continue...';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
}
Start-Process powershell {
    cd client
    npm install
    Write-Host -NoNewLine 'Press any key to continue...';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
}