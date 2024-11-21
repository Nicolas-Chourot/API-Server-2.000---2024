import Model from './model.js';
import Registration from './registration.js';
import Repository from './repository.js';
import Course from './course.js';
export default class Student extends Model {
    constructor() {
        super();

        this.addField('Name', 'string');
        this.addField('AC', 'string');
        this.setKey("Name");
    }

    bindExtraData(instance) {
        instance = super.bindExtraData(instance);
        let registrationsRepository = new Repository(new Registration());
        let coursesRepository = new Repository(new Course());
        let registrations = registrationsRepository.getAll({StudentId : instance.Id});
        this.addField('Courses', 'array');
        instance.Courses = [];
        registrations.forEach(registration => {
            let course = coursesRepository.get(registration.CourseId, true /*do not bind extra data / prevent from infinite loop */);
            course.Year = registration.Year;
            instance.Courses.push(course);
        });
        return instance;
    }
}