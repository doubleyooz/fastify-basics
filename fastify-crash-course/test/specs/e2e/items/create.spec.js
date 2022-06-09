import { createItem } from "../../../helpers/item.helper";

import { item1, item2 } from "../../../mocks/item.mock";

const describeif = condition => (condition ? describe : describe.skip);
const runAll = false;

describe('Item', () => {
    describeif(!runAll)('should accept', () => {
        createItem(item1, null, 201)
    })
})