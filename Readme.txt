Steps 
1. Open Visual Studio 2019. Create new web application in .Net Core with angular.
2. Install EntityFrameworkCore using package manager console
	Install-Package Microsoft.EntityFrameworkCore.Tools -Version 3.1.3
3. Install pgsql from nuget package version 3.1.3
	Npgsql.EntityFrameworkCore.PostgreSQL

4. Set up startup.cs file
	public void ConfigureServices(IServiceCollection services)
        {

            services.AddScoped<IUserDetailRepository, UserDetailRepository>();
            //Database Connection
            services.AddDbContext<ApplicationContext>(opts => opts.UseNpgsql(Configuration["ConnectionString:EmployeeDB"]));

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

4. Add connection string in appsettings.js file
 "ConnectionString": {
    "EmployeeDB": "server=localhost;database=KPMG_IATOOL;User ID=postgres;password=promact2019;"
  },

5. Create ApplicationContext for creating table in database

6. Create model for table creation
7. Execute given command from package manager console to create migration script
			Add-Migration EFCoreCodeFirstSample
			update-database