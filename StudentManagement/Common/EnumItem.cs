namespace StudentManagement.Common
{
    public class EnumItem
    {
        public int Value { get; }
        public string Name { get; }

        public EnumItem(int value, string name)
        {
            Value = value;
            Name = name;
        }
    }
}
