import Filter from "../models/filterModel.js";
import Project from "../models/projectModel.js";
import Joi from "joi";
import AppConfig from "../models/appConfigModel.js";
import PlayerConfig from "../models/playerConfigModel.js";

export const getConfigsFromFilterParams = async (req, res) => {
  try {
    const bodySchema = Joi.object({
      country: Joi.string().required(),
      subscription: Joi.string().required(),
      OS: Joi.string().required(),
      OSver: Joi.string().required(),
      projectID: Joi.string().required(),
    });
    await bodySchema.validateAsync(req.query);

    const params = {
      country: req.query.country,
      subscription: req.query.subscription,
      OS: req.query.OS,
      OSver: req.query.OSver,
    };

    const FilterResult = await Filter.findOne({ params }, { filterID: 1 });

    if (!FilterResult) {
      return res.status(404).json({ message: "Filter not found" });
    }

    const filterID = FilterResult.filterID;
    const projectID = req.query.projectID;

    const project = await Project.findOne({ projectID });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const result = project.configs.find(
      (config) => config.filterID === filterID
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "No configs found for this filter" });
    }

    const { appConfigID, playerConfigID } = result;

    const appConfig = await AppConfig.findOne({ configID: appConfigID });
    const playerConfig = await PlayerConfig.findOne({
      configID: playerConfigID,
    });

    res.status(200).json({ appConfig, playerConfig });
  } catch (error) {
    if (error.details) {
      return res
        .status(400)
        .json(error.details.map((detail) => detail.message).join(", "));
    }

    return res.status(500).send(error.message);
  }
};
