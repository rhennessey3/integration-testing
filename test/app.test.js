const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
              const app = res.body[0];
              expect(app).to.include.all.keys(
                'App', 'Rating', 'Genres');
              })
            })
    
            it('should be 400 if sort is incorrect', () => {
                return supertest(app)
                  .get('/apps')
                  .query({ sort: 'MISTAKE' })
                  .expect(400, 'Sort must be one of ratings or app');
              });
            

            it('should sort by rating', () => {
                return supertest(app)
                  .get('/apps')
                  .query({ sort: 'Rating' })
                  .expect(200)
                  .expect('Content-Type', /json/)
                  .then(res => {
                    let sorted = true;
                    let i =0;
                    for (let i =0; i <res.body.length - 1;i++) {
                        console.log(res.body[i])
                        if (sorted && res.body[i].Rating <= res.body[i + 1].Rating){
                            sorted = true;
                        }
                        else {
                            sorted = false;

                        }   
                    }
                    expect(sorted).to.be.true;
                  });
                });
            })
        
           