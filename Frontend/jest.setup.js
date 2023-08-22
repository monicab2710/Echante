import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'
import {server} from './test/server.ts'

process.env.ENCHANTE_API_URL = 'http://localhost/marvel/api/v1'

beforeAll(() => server.listen())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())