using System;
using System.Collections.Generic;
using System.Linq;

namespace StudentManagement.Common
{
    public static class EnumHelper<T> where T : struct, IConvertible
    {
        public static List<EnumItem> ToList()
        {
            if (!typeof(T).IsEnum)
                throw new ArgumentException("T must be an enumerated type");

            return Enum.GetValues(typeof(T)).
                Cast<T>().
                Select(x => new EnumItem(Convert.ToInt32(x), Enum.GetName(typeof(T), x)))
                .ToList();
        }
    }
}
