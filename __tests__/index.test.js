'use strict';

import signer from '../index.js';

const secureURLToken = 't0k3n';

describe('errors', () => {
    it('should skip non-url strings', (done) => {
        expect(signer('Lorem Ipsum', secureURLToken))
            .toMatch('Lorem Ipsum');

        done();
    });
});

describe('basics', () => {
    it('should sign imgix domains', (done) => {
        expect(signer('https://baz.imgix.net/foo/bar/?w=10&h=20', secureURLToken))
            .toMatch('https://baz.imgix.net/foo/bar/?w=10&h=20&s=f7d3b024326d708c920ec770249c3fdf');
        expect(signer('https://baz.imgix.net/foo/bar/baz?w=10&h=20', secureURLToken))
            .toMatch('https://baz.imgix.net/foo/bar/baz?w=10&h=20&s=3add97f5a441e1ebfbd4fda73ca9bea5');
        expect(signer('https://baz.imgix.net/foo/bar/baz.jpg?w=10&h=20', secureURLToken))
            .toMatch('https://baz.imgix.net/foo/bar/baz.jpg?w=10&h=20&s=1c0ee4f3b0893b4a109c57825c55da98');

        done();
    });
});

describe('with supplied domain', () => {
    it('should sign imgix domains if matching domain is supplied', (done) => {
        expect(signer('https://baz.imgix.net/foo/bar/?w=10&h=20', secureURLToken, 'baz.imgix.net'))
            .toMatch('https://baz.imgix.net/foo/bar/?w=10&h=20&s=f7d3b024326d708c920ec770249c3fdf');

        done();
    });

    it('should not sign imgix domains if a different domain is supplied', (done) => {
        expect(signer('https://baz.imgix.net/foo/bar/?w=10&h=20', secureURLToken, 'baz.com'))
            .toMatch('https://baz.imgix.net/foo/bar/?w=10&h=20');

        done();
    });
});

describe('with supplied array of domains', () => {
    it('should sign imgix domains if array of matching domains is supplied', (done) => {
        expect(signer('https://baz.imgix.net/foo/bar/?w=10&h=20', secureURLToken, ['baz.imgix.net', 'bat.imgix.net']))
            .toMatch('https://baz.imgix.net/foo/bar/?w=10&h=20&s=f7d3b024326d708c920ec770249c3fdf');
        expect(signer('https://bat.imgix.net/foo/bar/?w=10&h=20', secureURLToken, ['baz.imgix.net', 'bat.imgix.net']))
            .toMatch('https://bat.imgix.net/foo/bar/?w=10&h=20&s=f7d3b024326d708c920ec770249c3fdf');

        done();
    });

    it('should not sign imgix domains if array of different domains is supplied', (done) => {
        expect(signer('https://baz.imgix.net/foo/bar/?w=10&h=20', secureURLToken, ['baz.com', 'bat.com']))
            .toMatch('https://baz.imgix.net/foo/bar/?w=10&h=20');

        done();
    });
});