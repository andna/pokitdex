import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Simplex} from "../types/Simplex";
import colors from "../components/atoms/colors";
import {addPokemon} from "../services/pokemonGetter";
import {router} from "next/client";



const styles = {
    field: {
        marginBottom: 3,
        "& .MuiFormLabel-colorPrimary:not(.Mui-focused)" :{
            opacity: 0.4
        },
        "& .Mui-error" :{
            color: colors.error
        },
        "& .Mui-focused" :{
            color: colors.white
        }
    },
    capitalize: {textTransform: 'capitalize' as 'capitalize'}
}

const types : Simplex[] = [
    {"name": "normal",},
    {"name": "fighting",},
    {"name": "flying",},
    {"name": "poison",},
    {"name": "ground",},
    {"name": "rock",},
    {"name": "bug",},
    {"name": "ghost",},
    {"name": "steel",},
    {"name": "fire",},
    {"name": "water",},
    {"name": "grass",},
    {"name": "electric",},
    {"name": "psychic",},
    {"name": "ice", },
    {"name": "dragon",},
    {"name": "dark", },
    {"name": "fairy",},
    {"name": "unknown",},
    {"name": "shadow",}]

const regImage = /(https?:\/\/.*\.(?:png))/i;

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    subname: yup
        .string()
        .nullable()
        .notRequired(),
    type1: yup
        .string()
        .required('Type 1 is required'),
    type2: yup
        .string()
        .nullable()
        .notRequired(),
    imgLink1: yup
        .string()
        .matches(regImage,
            'Valid .png Image URL is required'),
    imgLink2: yup
        .string()
        .nullable()
        .notRequired(),
    height: yup
        .number()
        .min(0.01, 'Min value 0.01.')
        .max(100, 'Max value 100.')
        .required('Height is required'),
    weight: yup
        .number()
        .min(0.1, 'Min value 0.1.')
        .max(1000, 'Max value 1000.')
        .required('Height is required'),
    experience_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(608, 'Max value 608.')
        .required('Base Experience is required'),
    hp_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('HP Stat Base is required'),
    hp_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('HP Stat Effort is required'),
    attack_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('Attack Stat Base is required'),
    attack_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('Attack Stat Effort is required'),
    defense_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('Defense Stat Base is required'),
    defense_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('Defense Stat Effort is required'),
    spc_attack_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('Special Atk. Stat Base is required'),
    spc_attack_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('Special Atk. Stat Effort is required'),
    spc_defense_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('Special Def. Stat Base is required'),
    spc_defense_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('Special Def. Stat Effort is required'),
    speed_base: yup
        .number()
        .min(1, 'Min value 1.')
        .max(255, 'Max value 255.')
        .required('Speed Stat Base is required'),
    speed_effort: yup
        .number()
        .min(0, 'Min value 0.')
        .max(3, 'Max value 3.')
        .required('Speed Stat Effort is required'),
    ability1: yup
        .string()
        .required('1st Ability is required'),
    ability2: yup
        .string()
        .nullable()
        .notRequired(),
    abilityHidden: yup
        .string()
        .nullable()
        .notRequired(),
});

const Add = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            subname: '',
            type1: '',
            type2: 'none',
            imgLink1: '',
            imgLink2: '',
            height: 0.5,
            weight: 50,
            experience_base: 100,
            hp_base: 100,
            hp_effort: 0,
            attack_base: 100,
            attack_effort: 0,
            defense_base: 100,
            defense_effort: 0,
            spc_attack_base: 100,
            spc_attack_effort: 0,
            spc_defense_base: 100,
            spc_defense_effort: 0,
            speed_base: 100,
            speed_effort: 0,
            ability1: 'Intimidate',
            ability2: '',
            abilityHidden: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addPokemon(values);
            router.push('/');
        },
    });

    const typeColors : any = colors.types;

    return (
        <div style={{maxWidth: 800}}>
            <h2>Add your custom Pokemon</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="subname"
                    name="subname"
                    label="Sub Name (Optional)"
                    value={formik.values.subname}
                    onChange={formik.handleChange}
                    error={formik.touched.subname && Boolean(formik.errors.subname)}
                    helperText={formik.touched.subname && formik.errors.subname}
                    sx={styles.field}
                />
                <FormControl fullWidth>
                    <InputLabel id="type1">Primary Type</InputLabel>
                    <Select
                        labelId="type1"
                        id="type1"
                        name="type1"
                        value={formik.values.type1}
                        onChange={formik.handleChange}
                        error={formik.touched.type1 && Boolean(formik.errors.type1)}
                        sx={styles.field}
                    >
                        {types.map(type => (
                            <MenuItem key={type.name} value={type.name} sx={styles.capitalize}>
                                <span style={{color: typeColors[type.name]}}>⬤ </span>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="type2">Secondary Type (Optional)</InputLabel>
                    <Select
                        labelId="type2"
                        id="type2"
                        name="type2"
                        value={formik.values.type2}
                        onChange={formik.handleChange}
                        error={formik.touched.type2 && Boolean(formik.errors.type2)}
                        sx={styles.field}
                    >
                        <MenuItem value="none">none</MenuItem>
                        {types.map(type => (
                            <MenuItem key={type.name} value={type.name} sx={styles.capitalize}>
                                <span style={{color: typeColors[type.name]}}>⬤ </span>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    id="imgLink1"
                    name="imgLink1"
                    label="Image URL - for List"
                    value={formik.values.imgLink1}
                    onChange={formik.handleChange}
                    error={formik.touched.imgLink1 && Boolean(formik.errors.imgLink1)}
                    helperText={(formik.touched.imgLink1 && formik.errors.imgLink1)
                    || 'Recommended: Transparent .png / 96x96px'}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="imgLink2"
                    name="imgLink2"
                    label="Artwork URL - for Page (Optional)"
                    value={formik.values.imgLink2}
                    onChange={formik.handleChange}
                    error={formik.touched.imgLink2 && Boolean(formik.errors.imgLink2)}
                    helperText={(formik.touched.imgLink2 && formik.errors.imgLink2)
                    || 'Recommended: Transparent .png / 400x400px'}
                    sx={styles.field}
                />

                <TextField
                    fullWidth
                    id="height"
                    name="height"
                    label="Height (in meters)"
                    value={formik.values.height}
                    onChange={formik.handleChange}
                    error={formik.touched.height && Boolean(formik.errors.height)}
                    helperText={formik.touched.height && formik.errors.height}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="weight"
                    name="weight"
                    label="Weight (in kilograms)"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="experience_base"
                    name="experience_base"
                    label="Base Experience"
                    value={formik.values.experience_base}
                    onChange={formik.handleChange}
                    error={formik.touched.experience_base && Boolean(formik.errors.experience_base)}
                    helperText={formik.touched.experience_base && formik.errors.experience_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="hp_base"
                    name="hp_base"
                    label="HP (Health Points) Base"
                    value={formik.values.hp_base}
                    onChange={formik.handleChange}
                    error={formik.touched.hp_base && Boolean(formik.errors.hp_base)}
                    helperText={formik.touched.hp_base && formik.errors.hp_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="hp_effort"
                    name="hp_effort"
                    label="HP (Health Points) Effort"
                    value={formik.values.hp_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.hp_effort && Boolean(formik.errors.hp_effort)}
                    helperText={formik.touched.hp_effort && formik.errors.hp_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="attack_base"
                    name="attack_base"
                    label="Attack Base"
                    value={formik.values.attack_base}
                    onChange={formik.handleChange}
                    error={formik.touched.attack_base && Boolean(formik.errors.attack_base)}
                    helperText={formik.touched.attack_base && formik.errors.attack_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="attack_effort"
                    name="attack_effort"
                    label="Attack Effort"
                    value={formik.values.attack_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.attack_effort && Boolean(formik.errors.attack_effort)}
                    helperText={formik.touched.attack_effort && formik.errors.attack_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="defense_base"
                    name="defense_base"
                    label="Defense Base"
                    value={formik.values.defense_base}
                    onChange={formik.handleChange}
                    error={formik.touched.defense_base && Boolean(formik.errors.defense_base)}
                    helperText={formik.touched.defense_base && formik.errors.defense_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="defense_effort"
                    name="defense_effort"
                    label="Defense Effort"
                    value={formik.values.defense_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.defense_effort && Boolean(formik.errors.defense_effort)}
                    helperText={formik.touched.defense_effort && formik.errors.defense_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="spc_attack_base"
                    name="spc_attack_base"
                    label="Special Atk. Base"
                    value={formik.values.spc_attack_base}
                    onChange={formik.handleChange}
                    error={formik.touched.spc_attack_base && Boolean(formik.errors.spc_attack_base)}
                    helperText={formik.touched.spc_attack_base && formik.errors.spc_attack_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="spc_attack_effort"
                    name="spc_attack_effort"
                    label="Special Atk. Effort"
                    value={formik.values.spc_attack_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.spc_attack_effort && Boolean(formik.errors.spc_attack_effort)}
                    helperText={formik.touched.spc_attack_effort && formik.errors.spc_attack_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="spc_defense_base"
                    name="spc_defense_base"
                    label="Special Def. Base"
                    value={formik.values.spc_defense_base}
                    onChange={formik.handleChange}
                    error={formik.touched.spc_defense_base && Boolean(formik.errors.spc_defense_base)}
                    helperText={formik.touched.spc_defense_base && formik.errors.spc_defense_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="spc_defense_effort"
                    name="spc_defense_effort"
                    label="Special Def. Effort"
                    value={formik.values.spc_defense_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.spc_defense_effort && Boolean(formik.errors.spc_defense_effort)}
                    helperText={formik.touched.spc_defense_effort && formik.errors.spc_defense_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="speed_base"
                    name="speed_base"
                    label="Speed Base"
                    value={formik.values.speed_base}
                    onChange={formik.handleChange}
                    error={formik.touched.speed_base && Boolean(formik.errors.speed_base)}
                    helperText={formik.touched.speed_base && formik.errors.speed_base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="speed_effort"
                    name="speed_effort"
                    label="Speed Effort"
                    value={formik.values.speed_effort}
                    onChange={formik.handleChange}
                    error={formik.touched.speed_effort && Boolean(formik.errors.speed_effort)}
                    helperText={formik.touched.speed_effort && formik.errors.speed_effort}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="ability1"
                    name="ability1"
                    label="Ability 1st"
                    value={formik.values.ability1}
                    onChange={formik.handleChange}
                    error={formik.touched.ability1 && Boolean(formik.errors.ability1)}
                    helperText={formik.touched.ability1 && formik.errors.ability1}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="ability2"
                    name="ability2"
                    label="Abilit 2nd (Optional)"
                    value={formik.values.ability2}
                    onChange={formik.handleChange}
                    error={formik.touched.ability2 && Boolean(formik.errors.ability2)}
                    helperText={formik.touched.ability2 && formik.errors.ability2}
                    sx={styles.field}
                />
                <TextField
                    fullWidth
                    id="abilityHidden"
                    name="abilityHidden"
                    label="Ability Hidden (Optional)"
                    value={formik.values.abilityHidden}
                    onChange={formik.handleChange}
                    error={formik.touched.abilityHidden && Boolean(formik.errors.abilityHidden)}
                    helperText={formik.touched.abilityHidden && formik.errors.abilityHidden}
                    sx={styles.field}
                />

                <i style={{opacity: 0.4}}>Coming soon: Moves, Types and Abilities autocomplete inputs, etc.</i>
                <br />
                <br />
                {formik.touched && !formik.isValid &&
                <span style={{color: colors.error}}>Complete all the inputs to Submit.</span>}

                <Button sx={{...(formik.isValid ? null : { opacity: 0.4})}}
                    color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
 export default Add;
