# שלב הבנייה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# שלב העתקת קבצי csproj
COPY AutoGrade.sln ./
COPY AutoGrade.api/*.csproj SmartGradeAPI.api/
COPY AutoGrade.core/*.csproj SmartGradeAPI.core/
COPY AutoGrade.data/*.csproj SmartGradeAPI.data/
COPY AutoGrade.service/*.csproj SmartGradeAPI.service/

# שחזור תלויות
RUN dotnet restore AutoGrade.sln

# העתקת שאר הקוד
COPY . .

# מחיקת כל bin/obj כדי למנוע שגיאות כתיבה
RUN find . -type d -name bin -exec rm -rf {} + && \
    find . -type d -name obj -exec rm -rf {} +

# פרסום הפרויקט
WORKDIR /src/AutoGrade.api
RUN dotnet publish AutoGrade.api.csproj -c Release -o /app/publish

# שלב הריצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "AutoGrade.api.dll"]
