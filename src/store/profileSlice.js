import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { action } from '@storybook/addon-actions'
import ProfileDataService from 'services/summaryDashboard.service'

export const retrieveProfileData = createAsyncThunk(
  'summary-dashboard/retrieveProfileData',
  async () => {
    const response = await ProfileDataService.getAll()
    return response.data
  },
)

const initialState = {
  isError: false,
  isLoading: false,
  profileData: [],
}

export const profileSlice = createSlice({
  name: 'profileSlice',

  initialState,

  reducers: {
    reset: state => {
      state.isError = false
      state.isLoading = false
      state.profileData = []
    },
  },

  extraReducers: builder => {
    builder
      .addCase(retrieveProfileData.pending, state => {
        state.isLoading = true
        state.isError = false
        console.log(state)
      })

      .addCase(retrieveProfileData.fulfilled, (state, action) => {
        state.profileData = action.payload
        state.isLoading = false
        console.log(state)
      })

      .addCase(retrieveProfileData.rejected, state => {
        state.isError = true
        state.isLoading = false
        console.log(state)
      })
  },
})

export const { reset } = profileSlice.actions

const { reducer } = profileSlice
export default reducer
