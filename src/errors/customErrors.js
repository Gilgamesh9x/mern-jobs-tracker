export class NotFoundError extends Error {
  constructor(message) {
    super(message); // Call the parent class's constructor (Error)
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

/* 
so instead of doing: res.status(404).json({ message: "Job not found." })
we can now do: new NotFoundError("and pass the message here")
 */
