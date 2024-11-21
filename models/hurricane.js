import Model from './model.js';

export default class Hurricane extends Model {
    constructor() {
        super();

        this.addField('Year', 'integer');
        this.addField('Storm', 'integer');
        this.addField('Cat1', 'integer');
        this.addField('Cat2', 'integer');
        this.addField('Cat3', 'integer');
        this.addField('Cat4', 'integer');
        this.addField('Cat5', 'integer');
        this.setKey("Year");
    }

    bindExtraData(instance) {
        instance = super.bindExtraData(instance);
        this.addField('Total', 'integer');
        instance.Total = instance.Storm + instance.Cat1 + instance.Cat2 + instance.Cat3 + instance.Cat4 + instance.Cat5;
        return instance;
    }
}