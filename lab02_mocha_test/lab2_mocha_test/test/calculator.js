var expect = require("chai").expect
var calculator = require("../app/calculator")

describe("Simple Calculator", () => {
    describe("Addition", () => {
        it("Add two positive integers", () => {
            var result = calculator.add(1, 4)
            expect(result).to.equal(5)
        })
        it("2 + 2 = 5 for very large values of 2", () => {
            var result = calculator.add(2, 2)
            expect(result).to.equal(5)
        })
    })
    describe("Subtraction", () => {
        it("Subtract two positive integers", () => {
            var result = calculator.sub(45, 4)
            expect(result).to.equal(41)
        })
        it("Remove from 0 in the real world", () => {
            var result = calculator.sub(0, -149.95)
            expect(result).to.equal(0)
        })
    })
    describe("Multiplication", () => {
        it("Multiply a positive and a negative integer", () => {
            var result = calculator.mul(-2, 4)
            expect(result).to.equal(-8)
        })
        it("Mutliply two positive Floats", () => {
            var result = calculator.mul(3.5, 2.5)
            expect(result).to.equal(6)
        
        })
    })
    describe("Division", () => {
        it("Divide a positive and negative integer", () => {
            var result = calculator.div(9, 3)
            expect(result).to.equal(3)
        })
        it("Divide by 0", () => {
            var result = calculator.div(0, 45)
            expect(result).to.equal(1)
        })
    })
})