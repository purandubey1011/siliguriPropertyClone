const { catchAsyncErrors } = require("../middleware/CatchAsyncError");
const propertyModel = require("../models/Property.model");
const ErrorHandler = require("../utils/Errorhandler");
const userModel = require("../models/User.model");
const ownerModel = require("../models/Owner.model");
const ImageKit = require('imagekit');


const createOwner = catchAsyncErrors(async (req, res, next) => {
    // const { name, mobile } = req.body;

    // if (!name || !mobile) {
    //     return next(new ErrorHandler("Please enter all fields", 400));
    // }

    const user = await userModel.findById(req.user.id);
    
    user.usertype = "owner";

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    const owner = new ownerModel({
        name: user.name,
        owner: user._id,
    });
    await Promise.all([
        owner.save(),
        user.save(),
    ]);

    res.status(201).json({
        success: true,
        message: "Owner created successfully",
        owner,
    });
});

const removeOwner = catchAsyncErrors(async (req, res, next) => {
     const user = await userModel.findById(req.user.id);
    //  ownerModel.findByIdAndDelete(user.owner);
     user.usertype = "user";
     user.save();
    res.status(201).json({
        success: true,
        message: "Owner removed successfully",
    });
});

const createProperty = catchAsyncErrors(async (req, res, next) => {
    const {
      title,
propertyTitle,
firstName,
lastName,
propertyType,
tenantType,
description,
area,
bedrooms,
bathrooms,
rent,
security,
negotiable,
address,
city,
state,
pincode,
locationAdvantages,
amenities,
mediaFiles,
kitchen,
floorno,
totalfloors,
facing,
ageofproperty,
parking,
numberofcarparking,
numberofbikeparking,
watersupply,
furnishing,
projectUnits,
superBuiltUpArea,
numberofbalconies,
typeOfPossession,
id,
featuredImage,
brochure,
floorPlan,
whatsappNumber,
phoneNumber,
transactionType,
builtUpArea,
ownershipType,
minnoofSeats,
maxnoofSeats,
noOfCabin,
noOfMeetingRooms,
OfficeWashrooom,
receptionArea,
pantryType,
fireSafety,
noofstaircases,
lift,
passengerLift,
serviceLift,
propertyKind,
maintenanceCharges,
dateOfPossession,
typeOfParking,
ReraId,
bookingAmount
    } = req.body;
    console.log(req.body)
    // if (!title || !firstName || !lastName || !propertyType || !tenantType || !rent || !security || !negotiable || !address || !city || !state || !pincode || !amenities) {
    //     return next(new ErrorHandler("Please enter all fields", 400));
    // }
    console.log('id',id)
    const user = await userModel.findById(id);
    console.log(id)
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const property = new propertyModel({
         title,
propertyTitle,
firstName,
lastName,
propertyType,
tenantType,
description,
area,
bedrooms,
bathrooms,
rent,
security,
negotiable,
address,
city,
state,
pincode,
locationAdvantages,
amenities,
mediaFiles,
kitchen,
floorno,
totalfloors,
facing,
ageofproperty,
parking,
numberofcarparking,
numberofbikeparking,
watersupply,
furnishing,
projectUnits,
superBuiltUpArea,
numberofbalconies,
typeOfPossession,
id,
featuredImage,
brochure,
floorPlan,
whatsappNumber,
phoneNumber,
transactionType,
builtUpArea,
ownershipType,
minnoofSeats,
maxnoofSeats,
noOfCabin,
noOfMeetingRooms,
OfficeWashrooom,
receptionArea,
pantryType,
fireSafety,
noofstaircases,
lift,
passengerLift,
serviceLift,
propertyKind,
maintenanceCharges,
dateOfPossession,
typeOfParking,
ReraId,
bookingAmount
    });

    user.properties.push(property._id);
    await Promise.all([user.save(), property.save()]);
    res.status(201).json({
        success: true,
        message: "Property created successfully",
        property,
    });
});

const uploadImage = catchAsyncErrors(async (req, res) => {
    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response
    const { token, expire, signature } = imagekit.getAuthenticationParameters();
    res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
})

const getAllProperties = catchAsyncErrors(async (req, res) => {
    const properties = await propertyModel.find();
    res.status(200).json({
        success: true,
        message: "Properties fetched successfully",
        properties,
    });
});

const updateProperty = catchAsyncErrors(async (req, res) => {

    const { id } = req.params;
    const {
          title,
propertyTitle,
firstName,
lastName,
propertyType,
tenantType,
description,
area,
bedrooms,
bathrooms,
rent,
security,
negotiable,
address,
city,
state,
pincode,
amenities,
mediaFiles,
kitchen,
floorno,
totalfloors,
facing,
ageofproperty,
parking,
numberofcarparking,
numberofbikeparking,
watersupply,
furnishing,
projectUnits,
superBuiltUpArea,
numberofbalconies,
typeOfPossession,
featuredImage,
brochure,
floorPlan,
whatsappNumber,
phoneNumber,
transactionType,
builtUpArea,
ownershipType,
minnoofSeats,
maxnoofSeats,
noOfCabin,
noOfMeetingRooms,
OfficeWashrooom,
receptionArea,
pantryType,
fireSafety,
noofstaircases,
lift,
passengerLift,
serviceLift,
propertyKind,
dateOfPossession,
maintenanceCharges,
typeOfParking,
verification,
ReraId,
bookingAmount
    } = req.body

    const property = await propertyModel.findById(id);

    if (!property) {
        return next(new ErrorHandler("Property not found", 404));
    }
    const updatedProperty = await propertyModel.findByIdAndUpdate(id, {
         title,
propertyTitle,
firstName,
lastName,
propertyType,
tenantType,
description,
area,
bedrooms,
bathrooms,
rent,
security,
negotiable,
address,
city,
state,
pincode,
amenities,
mediaFiles,
kitchen,
floorno,
totalfloors,
facing,
ageofproperty,
parking,
numberofcarparking,
numberofbikeparking,
watersupply,
furnishing,
projectUnits,
superBuiltUpArea,
numberofbalconies,
typeOfPossession,
featuredImage,
brochure,
floorPlan,
whatsappNumber,
phoneNumber,
transactionType,
builtUpArea,
ownershipType,
minnoofSeats,
maxnoofSeats,
noOfCabin,
noOfMeetingRooms,
OfficeWashrooom,
receptionArea,
pantryType,
fireSafety,
noofstaircases,
lift,
passengerLift,
serviceLift,
propertyKind,
dateOfPossession,
maintenanceCharges,
typeOfParking,
verification,
ReraId,
bookingAmount
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Property updated successfully",
        updatedProperty,
    });

})

const getSigleUserProperty = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.user.id;
    console.log(id)
    const property = await userModel.findById(id).populate("properties");
    if (!property) {
        return next(new ErrorHandler("Property not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Property fetched successfully",
        property,
    });
})


const getFilteredProperties = catchAsyncErrors(async (req, res, next) => {
    const {
        propertyType, // "Buy" / "Rent" / "Sell" (mapped to transactionType)
        type,         // "Flat/Apartment", "House", etc. (mapped to propertyType)
        location,     // full location string from client
        bhk,          // e.g. "3" or "1BHK" or "Open Desk"
        filters = {}, // the filters object from sidebar
        page = 1,
        limit = 20,
    } = req.body;

    console.log(req.body);

    const filter = {};

    // Basic filters
    if (propertyType) {
        filter.transactionType = propertyType;
    }

    if (type) {
        filter.propertyType = type;
    }

    // BHK filtering
    if (bhk) {
        const num = parseInt(bhk, 10);
        if (!isNaN(num)) {
            filter.bedrooms = num;
        } else {
            const bhkRegex = new RegExp(bhk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            filter.$or = filter.$or || [];
            filter.$or.push(
                { propertyKind: bhkRegex },
                { title: bhkRegex },
                { description: bhkRegex }
            );
        }
    }


    if (location) {
        const primary = String(location).split(',')[0].trim();
        if (primary) {
            const locRegex = new RegExp(primary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            filter.$or = filter.$or || [];
            filter.$or.push(
                { city: locRegex },
                { address: locRegex },
                { title: locRegex }
            );
        }
    }

    // ===== ADVANCED FILTERS FROM SIDEBAR =====
    
    // 1. Property Ratings Filter
    if (filters.propertyRatings) {
        const selectedRatings = Object.keys(filters.propertyRatings)
            .filter(key => filters.propertyRatings[key])
            .map(Number);
        
        if (selectedRatings.length > 0) {
            // Get the minimum selected rating
            const minRating = Math.min(...selectedRatings);
            filter.rating = { $gte: minRating };
        }
    }

    // 2. Price Range Filter
    if (filters.price) {
        if (filters.price.type === 'below-1cr') {
            filter.rent = { $lt: 10000000 }; // 1 Crore = 10,000,000
        } else if (filters.price.type === 'around-50l') {
            filter.rent = { $gte: 4500000, $lte: 5500000 }; // 50 Lakhs ± 5 Lakhs
        } else if (filters.price.type === 'range' && filters.price.value != null) {
            // Accept values like "5-10", "20+", "5" (crore string) or numeric
            const val = filters.price.value;
            const CRORE = 10000000;
            if (typeof val === 'string') {
                const v = val.trim();
                if (v.includes('-')) {
                    const [minStr, maxStr] = v.split('-').map(s => s.trim());
                    const min = parseFloat(minStr);
                    const max = parseFloat(maxStr);
                    const q = {};
                    if (!isNaN(min)) q.$gte = Math.floor(min * CRORE);
                    if (!isNaN(max)) q.$lte = Math.ceil(max * CRORE);
                    if (Object.keys(q).length) filter.rent = q;
                } else if (v.endsWith('+')) {
                    const num = parseFloat(v.slice(0, -1));
                    if (!isNaN(num)) filter.rent = { $gte: Math.floor(num * CRORE) };
                } else {
                    const num = parseFloat(v);
                    if (!isNaN(num)) {
                        // treat single value as upper bound (<=)
                        filter.rent = { $lte: Math.ceil(num * CRORE) };
                    }
                }
            } else if (typeof val === 'number') {
                // numeric value in crores -> upper bound
                filter.rent = { $lte: Math.ceil(val * CRORE) };
            }
        }
     }
 
     // 3. Property Types Filter
     if (filters.propertyTypes) {
         const selectedTypes = [];
         if (filters.propertyTypes.apartment) selectedTypes.push('Flat/Apartment', 'Apartment');
         if (filters.propertyTypes.land) selectedTypes.push('Residential Land', 'Land');
         if (filters.propertyTypes.farm) selectedTypes.push('Farm House', 'Farmhouse');
         
         if (selectedTypes.length > 0) {
             filter.propertyType = { $in: selectedTypes };
         }
     }
 
     // 4. Area Filter
     if (filters.area) {
        if (filters.area.type === 'below-500') {
            filter.builtUpArea = { $lt: 500 };
        } else if (filters.area.type === 'around-1000') {
            filter.builtUpArea = { $gte: 500, $lte: 1100 };
        } else if (filters.area.value != null && filters.area.type === null) {
            // Accept values like "0-2000", "10000+", "2000" (sq.ft string) or numeric
            const val = filters.area.value;
            if (typeof val === 'string') {
                const v = val.trim();
                if (v.includes('-')) {
                    const [minStr, maxStr] = v.split('-').map(s => s.trim());
                    const min = parseInt(minStr, 10);
                    const max = parseInt(maxStr, 10);
                    const q = {};
                    if (!isNaN(min)) q.$gte = Math.max(0, min);
                    if (!isNaN(max)) q.$lte = max;
                    if (Object.keys(q).length) filter.builtUpArea = q;
                } else if (v.endsWith('+')) {
                    const num = parseInt(v.slice(0, -1), 10);
                    if (!isNaN(num)) filter.builtUpArea = { $gte: num };
                } else {
                    const num = parseInt(v, 10);
                    if (!isNaN(num)) filter.builtUpArea = { $lte: num };
                }
            } else if (typeof val === 'number') {
                // numeric -> treat as upper bound
                filter.builtUpArea = { $lte: val };
            }
        }
     }
 
     // 5. Posted By Filter
    if (filters.postedBy) {
        const selectedPosters = [];
        if (filters.postedBy.owner) selectedPosters.push('Owner', 'owner');
        if (filters.postedBy.builder) selectedPosters.push('Builder', 'builder');
        if (filters.postedBy.dealer) selectedPosters.push('Dealer', 'dealer');
        if (filters.postedBy.feature) selectedPosters.push('Feature Dealer', 'featured dealer');
        
        if (selectedPosters.length > 0) {
            filter.postedBy = { $in: selectedPosters };
        }
    }

    // 6. Localities Filter
    if (filters.localities) {
        const selectedLocalities = [];
        if (filters.localities.hosur) selectedLocalities.push('Hosur Road', 'Hosur');
        if (filters.localities.koramangala) selectedLocalities.push('Koramangala');
        if (filters.localities.devanahalli) selectedLocalities.push('Devanahalli');
        if (filters.localities.jp) selectedLocalities.push('Jp Nagar', 'JP Nagar');
        
        if (selectedLocalities.length > 0) {
            // Create regex patterns for each locality
            const localityRegexes = selectedLocalities.map(loc => 
                new RegExp(loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
            );
            
            filter.$or = filter.$or || [];
            localityRegexes.forEach(regex => {
                filter.$or.push(
                    { locality: regex },
                    { address: regex },
                    { city: regex }
                );
            });
        }
    }

    // 7. Facing Direction Filter
    if (filters.facingDirection) {
        const selectedDirections = [];
        if (filters.facingDirection.east) selectedDirections.push('East', 'east');
        if (filters.facingDirection.north) selectedDirections.push('North', 'north');
        if (filters.facingDirection.south) selectedDirections.push('South', 'south');
        if (filters.facingDirection.west) selectedDirections.push('West', 'west');
        
        if (selectedDirections.length > 0) {
            filter.facing = { $in: selectedDirections };
        }
    }

    // 8. Verification Filter (photos/videos)
    if (filters.verification) {
        if (filters.verification.photos) {
            filter.photos = { $exists: true, $ne: [], $not: { $size: 0 } };
        }
        if (filters.verification.videos) {
            filter.videos = { $exists: true, $ne: [], $not: { $size: 0 } };
        }
    }

    // 9. Purchase Type Filter
    if (filters.purchaseType) {
        const selectedPurchaseTypes = [];
        if (filters.purchaseType.resale) selectedPurchaseTypes.push('Resale', 'resale');
        if (filters.purchaseType.newBooking) selectedPurchaseTypes.push('New Booking', 'new booking', 'New');
        
        if (selectedPurchaseTypes.length > 0) {
            filter.purchaseType = { $in: selectedPurchaseTypes };
        }
    }

    // Pagination
    const pageNum = Math.max(1, Number(page) || 1);
    const perPage = Math.max(1, Number(limit) || 20);
    const skip = (pageNum - 1) * perPage;

    // Get total count for pagination
    const totalCount = await propertyModel.countDocuments(filter);

    // Fetch properties
    const properties = await propertyModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);
console.log(filter)
    res.status(200).json({
        success: true,
        count: properties.length,
        totalCount,
        page: pageNum,
        perPage,
        totalPages: Math.ceil(totalCount / perPage),
        properties,
    });
});

const getAllUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await userModel
        .find({})
        .populate("properties")
        .lean();

    if (!users) {
        return next(new ErrorHandler("No users found", 404));
    }

    const formattedUsers = users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.mobile || u.phone || "N/A",
        role: u.usertype || "user",
        joinDate: u.createdAt?.toISOString().split("T")[0],
        properties: u.properties?.length || 0,
        status: u.status || "Active",
    }));

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users: formattedUsers,
    });
});

module.exports = {
    createOwner,
    createProperty,
    uploadImage,
    getAllProperties,
    updateProperty,
    getSigleUserProperty,
    removeOwner,
    getFilteredProperties,
    getAllUsers,
};