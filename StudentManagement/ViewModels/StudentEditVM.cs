using StudentManagement.DAL.Models;
using StudentManagement.Enums;
using System.ComponentModel.DataAnnotations;

namespace StudentManagement.ViewModels
{
    public class StudentEditVM
    {
        [Required]
        public int Id { get; set; }

        [Required, EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }

        [Required, MaxLength(40)]
        public string Surname { get; set; }

        [Required, MaxLength(40)]
        public string Name { get; set; }

        [MaxLength(60)]
        public string Patronymic { get; set; }

        [MinLength(6), MaxLength(16)]
        public string Identifier { get; set; }

        public static StudentEditVM FromStudent(Student student)
        {
            return new StudentEditVM
            {
                Id = student.Id,
                Gender = student.Gender,
                Surname = student.Surname,
                Name= student.Name,
                Patronymic = student.Patronymic,
                Identifier = student.Identifier,
            };
        }

        public Student ToStudent()
        {
            return new Student
            {
                Id = Id,
                Gender = Gender,
                Surname = Surname,
                Name = Name,
                Patronymic = !string.IsNullOrWhiteSpace(Patronymic)?Patronymic:null,
                Identifier = !string.IsNullOrWhiteSpace(Identifier)?Identifier:null,
            };
        }
    }
}