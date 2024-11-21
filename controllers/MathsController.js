
import Controller from './Controller.js';
import * as MathUtilities from "../MathUtilities.js";
import * as utilities from '../utilities.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
        this.params = HttpContext.path.params;
    }
    error(message) {
        if (this.params == null)
            this.params = {};
        this.params["error"] = message;
        this.HttpContext.response.JSON(this.params);
        return false;
    }
    result(value) {
        if (value === Infinity) value = "Infinity";
        if (isNaN(value)) value = "NaN";
        this.params["value"] = value;
        this.HttpContext.response.JSON(this.params);
    }
    getNumberParam(name) {
        if (name in this.params) {
            let n = utilities.tryParseFloat(this.params[name]);
            if (isNaN(n))
                return this.error(`'${name}' parameter is not a number`);
            this.params[name] = n;
        } else
            return this.error(`'${name}' parameter parameter is missing`);
        return true;
    }
    isPositiveInteger(name, value) {
        if (!(Number.isInteger(value) && (value > 0))) {
            return this.error(`'${name}' parameter must be an integer > 0`);
        }
        return true;
    }
    checkParamsCount(nbParams) {
        if (Object.keys(this.params).length > nbParams) {
            return this.error("too many parameters");
        }
        return true;
    }
    getUnaryParams() {
        return (
            this.getNumberParam('n') &&
            this.checkParamsCount(2)
        );
    }
    getBinaryParams() {
        return (
            this.getNumberParam('x') &&
            this.getNumberParam('y') &&
            this.checkParamsCount(3)
        );
    }
    doOperation() {
        if ('op' in this.params) {
            if (this.params.op === ' ') // patch http
                this.params.op = '+';
            switch (this.params.op) {
                case '+': // add operation   
                    if (this.getBinaryParams())
                        this.result(this.params.x + this.params.y);
                    break;
                case '-': // substract operation
                    if (this.getBinaryParams())
                        this.result(this.params.x - this.params.y);
                    break;
                case '*': // multiply operation
                    if (this.getBinaryParams())
                        this.result(this.params.x * this.params.y);
                    break;
                case '/': // divide operation
                    if (this.getBinaryParams())
                        this.result(this.params.x / this.params.y);
                    break;
                case '%': // modulo operation
                    if (this.getBinaryParams())
                        this.result(this.params.x % this.params.y);
                    break;
                case '!': // factorial operation
                    if (this.getUnaryParams()) {
                        if (this.isPositiveInteger('n', this.params.n))
                            this.result(MathUtilities.factorial(this.params.n));
                    }
                    break;
                case 'p': // is prime number operation
                    if (this.getUnaryParams())
                        if (this.isPositiveInteger('n', this.params.n))
                            this.result(MathUtilities.isPrime(this.params.n));
                    break;
                case 'np': // find nth prime number operation
                    if (this.getUnaryParams())
                        if (this.isPositiveInteger('n', this.params.n))
                            this.result(MathUtilities.findPrime(this.params.n));
                    break;
                default:
                    return this.error("unknown operation");
            }
        } else {
            return this.error("'op' parameter is missing");
        }

    }

    get() {
        if (this.HttpContext.path.queryString == undefined)
            this.error("Missing query string");
        else
            this.doOperation();
    }
}