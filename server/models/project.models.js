const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        recipeName: {
            type: String,
        },
        recipeImage: {
            type: String,
        },
        recipeUrl: {
            type: String,
        },
        recipeUrlName: {
            type: String,
        },
        recipeComments: {
            type: String,
        },
        recipeInstructions: {
            type: String,
        },
        recipeSummary: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true}
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;