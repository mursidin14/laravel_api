<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCreateRequest;
use App\Http\Requests\ContactUpdateRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function create(ContactCreateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = Auth::user();

        $contact = new Contact($data);
        $contact->user_id = $user->id;
        $contact->save();

        return (new ContactResource($contact))->response()->setStatusCode(201);
    }

    public function getContact(int $id): ContactResource
    {
        $user = Auth::user();

        $contact = Contact::query()->where('id', $id)->where('user_id', $user->id)->first();
        if(!$contact) {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                    'not found'
                    ]
                ]
                ], 404));
        }

        return new ContactResource($contact);
    }

    public function update(int $id, ContactUpdateRequest $request): ContactResource
    {
        $user = Auth::user();

        $contact = Contact::query()->where('id', $id)->where('user_id', $user->id)->first();
        if(!$contact) {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                    'not found'
                    ]
                ]
                ], 404));
        }

        $data = $request->validated();
        $contact->fill($data);
        $contact->save();

        return new ContactResource($contact);
    }

    public function delete(int $id): jsonResponse
    {
        $user = Auth::user();

        $contact = Contact::query()->where('id', $id)->where('user_id', $user->id)->first();
        if(!$contact) {
            throw new HttpResponseException(response()->json([
                
                    'errors' => [
                        'message' => [
                        'not found'
                        ]
                    ]
                 
            ])->setStatusCode(404));
        }

        $contact->delete();
        return response()->json([
                'data' => true
            ])->setStatusCode(200);
    }

    public function search(Request $request): JsonResponse
    {
        $user = Auth::user();
        $page = $request->input('page', 1);
        $size = $request->input('size', 10);

        $contact = Contact::query()->where('user_id', $user->id);
        
    }
}
