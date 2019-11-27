using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using StudentManagement.DAL;
using StudentManagement.Common;
using StudentManagement.ViewModels;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        readonly StudentManagementContext _context;
        public StudentsController(StudentManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StudentDisplayVM>> GetStudents()
        {
            return _context.Students.Select(s => StudentDisplayVM.FromStudent(s)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<StudentEditVM> GetStudent(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            return StudentEditVM.FromStudent(student);
        }

        [HttpPost]
        public ActionResult<StudentEditVM> PostStudent([FromBody]StudentEditVM studentVM)
        {
            var student = studentVM.ToStudent();
            _context.Students.Add(student);
            _context.SaveChanges();
            return Ok(StudentEditVM.FromStudent(student));
        }

        [HttpPut("{id}")]
        public ActionResult PutStudent(int id, [FromBody]StudentEditVM studentVM)
        {
            if (id != studentVM.Id)
            {
                return BadRequest();
            }

            var student = studentVM.ToStudent();

            try
            {
                _context.Update(student);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.Students.Find(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost()]
        [Route("isidentifieravailable")]
        public ActionResult<bool> IsIdentifierAvailable([FromBody] IdentifierAvaliableParameters par)
        {
            bool unique = !(_context.Students.Any(x => x.Id != par.StudentId && x.Identifier == par.Identifier));
            return Ok(unique);
        }

        public class IdentifierAvaliableParameters
        {
            public int? StudentId { get; set; }
            public string Identifier { get; set; }
        }

        [HttpGet]
        [Route("genders")]
        public ActionResult<IEnumerable<EnumItem>> GetGenders()
        {
            return EnumHelper<Enums.Gender>.ToList();
        }
    }
}
