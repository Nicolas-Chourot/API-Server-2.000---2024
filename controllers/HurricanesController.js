import HurricaneModel from '../models/hurricane.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

//https://www.meteo-tropicale.fr/statistiques-cyclones-atantique/
export default class HurricanesController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new HurricaneModel()));
    }
}