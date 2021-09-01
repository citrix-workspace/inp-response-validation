import 'isomorphic-fetch'
import  {expect} from 'chai'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

import {getSuccessJson, getSuccessText} from '../src'

chai.use(chaiAsPromised as any);

describe('Web API response validation', () => {
	describe('getSuccessText()', () => {
		it('valid response should return body as String', async () => {
			const body = 'body content'
			const response = new Response(body, {status: 200})
			expect(await getSuccessText()(response)).to.equal(body)
		})
		it('invalid response should throw default error', async () => {
			const response = new Response(null, {status: 400})
			await expect(getSuccessText()(response)).to.be.rejectedWith(/Response status: 400 Bad Request/)
		})
		it('invalid response should throw custom error', async () => {
			const response = new Response(null, {status: 400})
			const customErrorMessage = 'Something went wrong'
			await expect(getSuccessText(customErrorMessage)(response)).to.be.rejectedWith(customErrorMessage)
		})
	})
	describe('getSuccessJson()', () => {
		it('valid response should return body as Object', async () => {
			const body = {body: 'content'}
			const response = new Response(JSON.stringify(body), {status: 200})
			expect(await getSuccessJson()(response)).to.be.deep.equal(body)
		})
	})
})
