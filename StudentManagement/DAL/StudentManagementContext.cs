using Microsoft.EntityFrameworkCore;
using StudentManagement.DAL.Models;

namespace StudentManagement.DAL
{
    public class StudentManagementContext : DbContext
    {
        public StudentManagementContext(DbContextOptions<StudentManagementContext> options) : base(options)
        { }

        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Student>(student =>
            {
                student.HasIndex(s => s.Identifier).IsUnique();
            });

            //Seed
            builder.Entity<Student>().HasData(
     new Student { Id = 1, Gender = Enums.Gender.Male, Surname = "Shubin", Name = "Vadim", Patronymic = "Borisovich", Identifier = "Developer" },
     new Student { Id = 2, Gender = Enums.Gender.Male, Surname = "Ivanov", Name = "Ivan", Patronymic = "Ivanovich" },
     new Student { Id = 3, Gender = Enums.Gender.Female, Surname = "Alexandrova", Name = "Alexandra" });
        }
    }
}
