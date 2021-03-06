$data.Class.define("$data.Facebook.types.FbPage", $data.Entity, null, {
    page_id: { type: "number", key: true, isPublic: true, searchable: true },
    name: { type: "string", isPublic: true, searchable: true },
    username: { type: "string", isPublic: true, searchable: true },
    description: { type: "string", isPublic: true },
    categories: { type: "array", isPublic: true },	//array	The categories
    is_community_page: { type: "bool", isPublic: true },	//string	Indicates whether the Page is a community Page.
    pic_small: { type: "string", isPublic: true },
    pic_big: { type: "string", isPublic: true },
    pic_square: { type: "string", isPublic: true },
    pic: { type: "string", isPublic: true },
    pic_large: { type: "string", isPublic: true },
    pic_cover: { type: "object", isPublic: true },	//object	The JSON object containing three fields: cover_id (the ID of the cover photo), source (the URL for the cover photo), andoffset_y (indicating percentage offset from top [0-100])
    unread_notif_count: { type: "number", isPublic: false },
    new_like_count: { type: "number", isPublic: false },
    fan_count: { type: "number", isPublic: true },
    type: { type: "string", isPublic: true },
    website: { type: "string", isPublic: true },
    has_added_app: { type: "bool", isPublic: true },
    general_info: { type: "string", isPublic: true },
    can_post: { type: "bool", isPublic: true },
    checkins: { type: "number", isPublic: true },
    is_published: { type: "bool", isPublic: true },
    founded: { type: "string", isPublic: true },
    company_overview: { type: "string", isPublic: true },
    mission: { type: "string", isPublic: true },
    products: { type: "string", isPublic: true },
    location: { type: "object", isPublic: true }, //	array	Applicable to all Places.
    parking: { type: "object", isPublic: true }, //     array	Applicable to Businesses and Places. Can be one of street, lot orvalet
    hours: { type: "array", isPublic: true }, //	array	Applicable to Businesses and Places.
    pharma_safety_info: { type: "string", isPublic: true },
    public_transit: { type: "string", isPublic: true },
    attire: { type: "string", isPublic: true },
    payment_options: { type: "object", isPublic: true },	//array	Applicable to Restaurants or Nightlife.
    culinary_team: { type: "string", isPublic: true },
    general_manager: { type: "string", isPublic: true },
    price_range: { type: "string", isPublic: true },
    restaurant_services: { type: "object", isPublic: true },//	array	Applicable to Restaurants.
    restaurant_specialties: { type: "object", isPublic: true },//	array	Applicable to Restaurants.
    phone: { type: "string", isPublic: true },
    release_date: { type: "string", isPublic: true },
    genre: { type: "string", isPublic: true },
    starring: { type: "string", isPublic: true },
    screenplay_by: { type: "string", isPublic: true },
    directed_by: { type: "string", isPublic: true },
    produced_by: { type: "string", isPublic: true },
    studio: { type: "string", isPublic: true },
    awards: { type: "string", isPublic: true },
    plot_outline: { type: "string", isPublic: true },
    season: { type: "string", isPublic: true },
    network: { type: "string", isPublic: true },
    schedule: { type: "string", isPublic: true },
    written_by: { type: "string", isPublic: true },
    band_members: { type: "string", isPublic: true },
    hometown: { type: "string", isPublic: true },
    current_location: { type: "string", isPublic: true },
    record_label: { type: "string", isPublic: true },
    booking_agent: { type: "string", isPublic: true },
    press_contact: { type: "string", isPublic: true },
    artists_we_like: { type: "string", isPublic: true },
    influences: { type: "string", isPublic: true },
    band_interests: { type: "string", isPublic: true },
    bio: { type: "string", isPublic: true },
    affiliation: { type: "string", isPublic: true },
    birthday: { type: "string", isPublic: true },
    personal_info: { type: "string", isPublic: true },
    personal_interests: { type: "string", isPublic: true },
    built: { type: "string", isPublic: true },
    features: { type: "string", isPublic: true },
    mpg: { type: "string", isPublic: true }
}, null);

