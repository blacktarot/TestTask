using StudentManagement.DAL.Models;
using StudentManagement.Enums;

namespace StudentManagement.ViewModels
{
    public class StudentDisplayVM
    {
        public int Id { get; set; }

        public Gender Gender { get; set; }

        public string FullName { get; set; }

        public string Identifier { get; set; }

        public static StudentDisplayVM FromStudent(Student student)
        {
            return new StudentDisplayVM
            {
                Id = student.Id,
                Gender = student.Gender,
                FullName = $"{student.Surname} {student.Name}{(!string.IsNullOrWhiteSpace(student.Patronymic) ? $" {student.Patronymic}":string.Empty)}",
                Identifier = student.Identifier,
            };
        }
    }
}
