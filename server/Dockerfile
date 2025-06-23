# שלב הבנייה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# שלב העתקת קבצי csproj
COPY server.sln ./
COPY api/*.csproj api/
COPY core/*.csproj core/
COPY data/*.csproj data/
COPY service/*.csproj service/

# שחזור תלויות
RUN dotnet restore server.sln

# העתקת שאר הקוד
COPY . .

# מחיקת כל bin/obj כדי למנוע שגיאות כתיבה
RUN find . -type d -name bin -exec rm -rf {} + && \
    find . -type d -name obj -exec rm -rf {} +

# פרסום הפרויקט
WORKDIR /src/api
RUN dotnet publish api.csproj -c Release -o /app/publish

# שלב הריצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "api.dll"]
