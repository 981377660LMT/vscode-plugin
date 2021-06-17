interface Admin extends User {
  adminRecord: AdminRecord
}

interface Student extends User {
  schoolRecord: SchoolRecord
}

interface User {
  firstName: string
  lastName: string
  username: string
  emailAddress: string
}

interface AdminRecord {
  studentsPassedEachYear: number[]
}

interface SchoolRecord {
  startDate: string
  endDate: string
  isActive: boolean
  grades: number[]
}
