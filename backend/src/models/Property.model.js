const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    title: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    tenantType: {
      type: String,
    },
    description: {
      type: String,
    },
    area: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    rent: {
      type: Number,
    },
    security: {
      type: Number,
    },
    negotiable: {
      type: Boolean,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    locationAdvantages: {
      type: Array,
      default: [],
    },
    amenities: {
      type: Object,
    },
    mediaFiles: {
      type: Array,
    },
    kitchen: {
      type: String,
    },
    floorno: {
      type: Number,
    },
    totalfloors: {
      type: Number,
    },
    facing: {
      type: String,
    },
    ageofproperty: {
      type: Number,
    },
    parking: {
      type: String,
    },
    numberofcarparking: {
      type: Number,
    },
    numberofbikeparking: {
      type: Number,
    },
    watersupply: {
      type: String,
    },
    furnishing: {
      type: String,
    },
    numberofbalconies: {
      type: String,
    },
    pricefrom: {
      type: Number,
    },
    priceto: {
      type: Number,
    },
    projectUnits: {
      type: Array,
      default: [],
    },
    verification: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    transactionType: {
      type: String,
      num: ["Sell", "Rent", "Lease", "PG"],
      default: "Sell",
    },
    builtUpArea: {
      type: Number,
    },
    superBuiltUpArea: {
      type: Number,
    },
    propertyKind: {
      type: String,
    },
    typeOfPossession: {
      type: String,
    },
    ownershipType: {
      type: String,
    },
    minnoofSeats: {
      type: Number,
    },
    maxnoofSeats: {
      type: Number,
    },
    noOfCabin: {
      type: Number,
    },
    noOfMeetingRooms: {
      type: Number,
    },
    OfficeWashrooom: {
      type: String,
    },
    receptionArea: {
      type: String,
    },
    pantryType: {
      type: String,
    },
    fireSafety: {
      type: Array,
    },
    noofstaircases: {
      type: String,
    },
    lift: {
      type: String,
    },
    passengerLift: {
      type: String,
    },
    serviceLift: {
      type: String,
    },
    floorPlan: {
      type: Array,
    },
    brochure: {
      type: Array,
    },
    featuredImage: {
      type: Array,
    },
    whatsappNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    dateOfPossession: {
      type: Date,
    },
    maintenanceCharges: {
      type: String,
    },
    typeOfParking: {
      type: String,
    },
    ReraId: {
      type: String,
    },
    bookingAmount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
