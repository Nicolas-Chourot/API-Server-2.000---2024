import Model from './model.js';
import Registration from './registration.js';
import Repository from './repository.js';
import Student from './student.js';
export default class Course extends Model {
    constructor() {
        super();

        this.addField('Title', 'string');
        this.addField('Code', 'string');
              
        this.setKey("Code");
    }

    bindExtraData(instance) {
        instance = super.bindExtraData(instance);
        let registrationsRepository = new Repository(new Registration());
        let studentsRepository = new Repository(new Student());
        let registrations = registrationsRepository.getAll({CourseId : instance.Id});
        this.addField('Students', 'array');
        instance.Students = [];
        registrations.forEach(registration => {
            let student = studentsRepository.get(registration.StudentId, true /*do not bind extra data */);
            student.Year = registration.Year;
            instance.Students.push(student);
        });
        return instance;
    }
}