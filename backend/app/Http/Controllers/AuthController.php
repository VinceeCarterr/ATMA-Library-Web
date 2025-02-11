<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'no_telp' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'role' => 'required|string|in:admin,anggota',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'no_telp' => $validated['no_telp'] ?? null,
            'address' => $validated['address'] ?? null,
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
        ], 201);
    }

    /**
     * Log in a user and return a token.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            return response()->json([
                'message' => 'Login successful!',
                'token' => $user->createToken('API Token')->plainTextToken,
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Fetch the authenticated user.
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if (auth()->user()->role === 'anggota') {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id_user,
                'password' => 'sometimes|string|min:8',
                'no_telp' => 'nullable|string|max:15',
                'address' => 'nullable|string|max:255',
                // Prevent role change for anggota
            ]);
        } else {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id_user,
                'password' => 'sometimes|string|min:8',
                'no_telp' => 'nullable|string|max:15',
                'address' => 'nullable|string|max:255',
                'role' => 'sometimes|string', // Admin can update role
            ]);
        }        

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['message' => 'Profile updated successfully!', 'user' => $user]);
    }

    public function logout(Request $request)
    {
        Log::info('Attempting to log out', ['user' => $request->user()]);

        if ($request->user()) {
            $request->user()->tokens()->delete(); // Sanctum token deletion
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No authenticated user'], 403);
    }
}
