using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDOperationDemo.Model;

namespace CRUDOperationDemo
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
               : base(options)
        {
        }


        //public DbSet<Student> Students { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }

    }
}
