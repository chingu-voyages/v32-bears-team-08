const service = require("./users.service");
const skillsService = require("../skills/skills.service")
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary")

async function find(req, res, next) {
    const response = await service.find(req.params.user_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `user ${req.params.user_id} not found`,
    })
}

async function recommend(req, res, next){

    const response = await service.recommend(req.params.user_id);

    if (response[0]) {

        const recommendationsWithSkills = await Promise.all(response.map(async (user) => {
            const skills = await skillsService.findByUser(user.id)
            return {...user, skills}
        }))

        return res.json({ 
            data: recommendationsWithSkills,
        });
    }
    next({
        status: 404,
        message: `No recommendations found`,
    })
    
}

async function update(req, res, next) {
    
    const response = await service.update(req.body.data);
    const {password, ...responseWithoutPassword} = response[0]
    return res.json({
        data: responseWithoutPassword
    })
}

async function remove(req, res, next) {
    const response = await service.remove(req.user.id);
    return res.json({
        data: response[0],
    })
}

function hasData(req, res, next) {
    if (req.body.data) {
        return next();
    }
    next({
        status: 400,
        message: "request body must have data property",
    })
}

module.exports = {
    find: [
        asyncErrorBoundary(find),
    ],
    recommend: [asyncErrorBoundary(recommend)],
    update: [
        hasData,
        asyncErrorBoundary(update),
    ],
    remove: [
        hasData,
        asyncErrorBoundary(remove),
    ],

}