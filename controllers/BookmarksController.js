import BookmarkModel from '../models/bookmark.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import AccessControl from '../accessControl.js';

export default class BookmarksController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new BookmarkModel()), AccessControl.anonymous());
    }

    /* Http GET action */
    list() {
        this.HttpContext.response.JSON(
            this.repository.getAll(this.HttpContext.path.params, this.repository.ETag)
        );
    }
}