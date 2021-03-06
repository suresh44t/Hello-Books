import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  UserDetails
} from '../server/models';

import app from '../server';

import {
  expiredActivationToken,
  invalidUserActivationToken,
  invalidActivationToken,
  badSignatureActivationToken
} from './mockData';

const should = chai.should();

chai.use(chaiHttp);

let firstGoodToken;
let secondGoodToken;

describe('POST /api/v1/users/signup version 1', () => {
  describe('When Users attempt to signup', () => {
    describe('When there is an issue with information provided', () => {
      it(`Should respond with 
      code 400 Invalid Username for blank username`,
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Username Invalid');
              done();
            });
        });
      it(`Should respond with code 400
       Invalid Username for usernames with spaces`,
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              username: 'test user with space',
              password: 'TestUser123$',
              firstname: 'Test',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Username Invalid');
              done();
            });
        });
      it(`Should respond with code 
      400 Username too short for Short username`,
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 't',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Username too short');
              done();
            });
        });
      it(`Should respond with code 400 
      Invalid First Name for blank firstname`,
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              username: 'Test',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('First Name Invalid');
              done();
            });
        });
      it('Should respond with code 400 First Name too short',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 't',
              username: 'Test',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('First Name too short');
              done();
            });
        });
      it('Should respond with code 400 for blank lastname',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              username: 'Test',
              firstname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Last Name Invalid');
              done();
            });
        });
      it('Should respond with code 400 for short lastname',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              lastname: 't',
              username: 'Test',
              firstname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Last Name too short');
              done();
            });
        });
      it('Should respond with code 400 for blank password',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              firstname: 'Test',
              username: 'Testuser',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Password Invalid');
              done();
            });
        });
      it('Should respond with code 400 for short Password',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'Ts',
              firstname: 'Test',
              username: 'Test',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Password too short');
              done();
            });
        });
      it('Should respond with code 400 for blank email',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser',
              lastname: 'User',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('No email Provided');
              done();
            });
        });
      it('Should respond with code 400 for Wrong email addres',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser',
              lastname: 'User',
              email: 'testuser.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Email Address invalid');
              done();
            });
        });
    });
    describe('When the Information provided is correct', () => {
      describe('When the Information provided is unique', () => {
        it('Should respond with code 201 User Created', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('User account created');
              response.body.membership.should.eql('Blue');
              firstGoodToken = response.body.token;
              done();
            });
        });
        it('Should respond with code 201 User Created', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'SomebodyElse',
              lastname: 'Else',
              email: 'somebodyelse@user.com.ng',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('User account created');
              response.body.membership.should.eql('Blue');
              secondGoodToken = response.body.token;
              done();
            });
        });
        it('Should respond with code 201 User Created', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'unactivatedUser$',
              firstname: 'Unactivated',
              username: 'UnactivatedUser',
              lastname: 'User',
              email: 'unactivated@user.com.ng',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('User account created');
              response.body.membership.should.eql('Blue');
              done();
            });
        });
      });
      describe('When Information provided is not unique', () => {
        it('Should respond with a 400 email must be unique', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'newUsname',
              lastname: 'Else',
              email: 'somebodyelse@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('emailaddress must be unique');
              done();
            });
        });
        it('Should respond with a 400 username must be unique', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'SomebodyElse',
              lastname: 'Else',
              email: 'newemailAddress@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('username must be unique');
              done();
            });
        });
      });
    });
  });
});
describe('GET /api/v1/users/verify', () => {
  describe('When an invalid token is used to verify email address', () => {
    it('Should return expired token error', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
          key: expiredActivationToken,
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.name.should.eql('TokenExpiredError');
          response.body.message.should.eql('jwt expired');
          done();
        });
    });
    it('Should return Invalid User error', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
          key: invalidUserActivationToken,
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Invalid User');
          done();
        });
    });
    it('Should return Invalid Token error', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
          key: invalidActivationToken,
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Invalid Token');
          done();
        });
    });
    it('Should return Invalid Token Signature error', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
          key: badSignatureActivationToken,
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.name.should.eql('JsonWebTokenError');
          response.body.message.should.eql('invalid signature');
          done();
        });
    });
    it('Should return Link invalid error when key not supplied', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Link Invalid');
          done();
        });
    });
    it('Should return Link invalid error when id not supplied', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          key: secondGoodToken,
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Link Invalid');
          done();
        });
    });
    it('Should return token malformed when fake token is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'SomebodyElse',
          key: 'trashtokenwithoutsignature',
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.name.should.eql('JsonWebTokenError');
          response.body.message.should.eql('jwt malformed');
          done();
        });
    });
  });
  describe('When a valid token is provided', () => {
    it('Should return Success User Activated when all is valid', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'somebodyelse',
          key: secondGoodToken,
        })
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('User Activated');
          done();
        });
    });
    it('Should return Success User Activated when all is valid', (done) => {
      chai.request(app)
        .get('/api/v1/users/verify')
        .query({
          id: 'Testuser',
          key: firstGoodToken,
        })
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('User Activated');
          done();
        });
    });
    it('Should return User already Activated',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/verify')
          .query({
            id: 'Testuser',
            key: firstGoodToken,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('None');
            response.body.message.should.eql('User already activated');
            done();
          });
      });
  });
});
describe('POST /api/v1/users/signin version 1', () => {
  describe('When attempting to signin and not signedin', () => {
    describe('When incomplete details are entered', () => {
      it('Should respond with a 400 no username supplied', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({
            password: 'TestUser123$',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('No username supplied');
            done();
          });
      });
      it('Should return a 400 no password supplied', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({
            username: 'Testuser',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('No Password supplied');
            done();
          });
      });
    });
    describe('When wrong details are entered', () => {
      it('Should respond with code 400 for Short username',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({
              password: 'TestUser123$',
              username: 't',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Username');
              done();
            });
        });
      it('Should respond with code 400 for Short Password',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({
              password: 'Tes',
              username: 'Testuser',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Password');
              done();
            });
        });
      it('Should respond with a 401 username invalid', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({
            password: 'TestUser123$',
            username: 'wrongusername',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Username');
            done();
          });
      });
      it('Should respond with a 401 invalid username/password', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({
            password: 'Wrongpassword$',
            username: 'Testuser',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Username or password');
            done();
          });
      });
    });
    describe('When valid details are entered', () => {
      describe('When user has not been activated yet', () => {
        it('Should return 401 User not activated', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({
              password: 'unactivatedUser$',
              username: 'UnactivatedUser',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Email Address not Verified');
              done();
            });
        });
      });

      describe('When user has been activated', () => {
        describe('When an Email is used to signin', () => {
          it('Should return 202 Success with details', (done) => {
            chai.request(app)
              .post('/api/v1/users/signin')
              .send({
                password: 'TestUser123$',
                username: 'Testuser',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(202);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Successful');
                response.body.message.should.eql('Signin Successful');
                should.exist(response.body.token);
                should.exist(response.headers['set-cookie']);
                done();
              });
          });
        });
        describe('When a username is used to signin', () => {
          it('Should return 202 Success with details', (done) => {
            chai.request(app)
              .post('/api/v1/users/signin')
              .send({
                password: 'SomebodyPassword123$',
                username: 'somebodyelse@user.com.ng',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(202);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Successful');
                response.body.message.should.eql('Signin Successful');
                should.exist(response.body.token);
                should.exist(response.headers['set-cookie']);
                done();
              });
          });
        });
      });
    });
  });
});
describe('GET /api/v1/users/signupCheck/:identifier', () => {
  describe('When valid details are entered', () => {
    it('should return 202 user details', (done) => {
      chai.request(app)
        .get('/api/v1/users/signupCheck/SomebodyElse')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          should.exist(response.body.userHere);
          done();
        });
    });
  });
});
describe('GET /api/v1/user/verify', () => {
  before((done) => {
    UserDetails
      .create({
        firstname: 'sample',
        lastname: 'User',
        emailaddress: 'sampleuser@example.com',
        username: 'sampleusername',
        password: 'samplePassword',
        authString: 'randomString',
        isAdmin: true,
        isActivated: false
      }).then(() => {
        done();
      });
  });
  describe('When user is Invalid', () => {
    it('Should return 400 Username Invalid', (done) => {
      chai.request(app)
        .get('/api/v1/user/verify/rubbishUser')
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.error.should.eql('Username Invalid');
          done();
        });
    });
  });
  describe('When user is Valid', () => {
    it('Should return 200 Success', (done) => {
      chai.request(app)
        .get('/api/v1/user/verify/sampleusername')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Email Sent');
          done();
        });
    });
  });
});
