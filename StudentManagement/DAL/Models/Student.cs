using StudentManagement.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.DAL.Models
{
    public class Student
    {
        [Key]
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
    }
}
