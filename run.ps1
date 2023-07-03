$arg1 = $args[0]
$argsWithoutFirst = $args | Select-Object -Skip 1
if ($arg1 -eq "prod") {
    deno run --allow-net --allow-write --allow-read .\index.ts $argsWithoutFirst
}
elseif ($arg1 -eq "dev") {
    denon run --allow-net --allow-write --allow-read .\index.ts $argsWithoutFirst
}
else {
    Write-Output "Please pass in if you want to run either the dev or prod version of the app"
    Write-Output "and pass the other args the program requires"
    Write-Output "EX: run.ps1 DEV|PROD"
}